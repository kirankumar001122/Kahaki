import { useState, useEffect, useCallback } from 'react';
import {
  LogOut, Users, Clock, CheckCircle, Search, RefreshCw,
  Phone, Mail, BookOpen, Monitor, ChevronDown, ChevronUp, X
} from 'lucide-react';
import './AdminDashboard.css';

const STATUS_LABELS = {
  new:          { label: 'New',          color: 'status--new' },
  contacted:    { label: 'Contacted',    color: 'status--contacted' },
  enrolled:     { label: 'Enrolled',     color: 'status--enrolled' },
  not_interested:{ label: 'Not Interested', color: 'status--closed' },
};

const COURSE_LABELS = {
  'school-tuition':   'School Tuition',
  '1st-puc-science':  '1st PUC Science',
  '2nd-puc-science':  '2nd PUC Science',
  '1st-puc-commerce': '1st PUC Commerce',
  '2nd-puc-commerce': '2nd PUC Commerce',
  'cet':              'CET Foundation',
  'neet':             'NEET Foundation',
  'jee':              'JEE Foundation',
  'spoken-english':   'Spoken English',
  'computer-training':'Computer Training',
  'career-skills':    'Career & Professional Skills',
  'other':            'Other / Not Sure',
};

const MODE_LABELS = {
  offline:    'Offline – Malur Campus',
  live_online:'Live Online',
};

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className={`dash-stat ${accent || ''}`}>
      <div className="dash-stat__icon"><Icon size={22} /></div>
      <div>
        <p className="dash-stat__value">{value}</p>
        <p className="dash-stat__label">{label}</p>
      </div>
    </div>
  );
}

function EnquiryRow({ row, expanded, onToggle }) {
  const status = STATUS_LABELS[row.status] || { label: row.status || 'New', color: 'status--new' };
  return (
    <>
      <tr className={`dash-table__row ${expanded ? 'dash-table__row--open' : ''}`} onClick={onToggle}>
        <td className="dash-td dash-td--name">
          <span className="dash-td__name">{row.student_name}</span>
          <span className="dash-td__date">{fmtDate(row.created_at)}</span>
        </td>
        <td className="dash-td">
          <a href={`tel:${row.mobile_number}`} className="dash-td__phone" onClick={(e) => e.stopPropagation()}>
            {row.mobile_number}
          </a>
        </td>
        <td className="dash-td dash-td--course">
          {COURSE_LABELS[row.course] || row.course || '—'}
        </td>
        <td className="dash-td">
          <span className={`dash-status ${status.color}`}>{status.label}</span>
        </td>
        <td className="dash-td dash-td--toggle">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </td>
      </tr>
      {expanded && (
        <tr className="dash-table__detail">
          <td colSpan={5}>
            <div className="dash-detail">
              <div className="dash-detail__grid">
                {row.email && (
                  <div className="dash-detail__item">
                    <Mail size={14} />
                    <span>{row.email}</span>
                  </div>
                )}
                {row.learning_mode && (
                  <div className="dash-detail__item">
                    <Monitor size={14} />
                    <span>{MODE_LABELS[row.learning_mode] || row.learning_mode}</span>
                  </div>
                )}
                {row.english_level && (
                  <div className="dash-detail__item">
                    <BookOpen size={14} />
                    <span>English Level: {row.english_level}</span>
                  </div>
                )}
                {row.message && (
                  <div className="dash-detail__item dash-detail__item--full">
                    <span className="dash-detail__msg-label">Message:</span>
                    <span>{row.message}</span>
                  </div>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AdminDashboard({ token, onLogout }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [search, setSearch]       = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [expandedId, setExpandedId]     = useState(null);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res  = await fetch('/api/admin/enquiries', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setEnquiries(json.enquiries || []);
      } else if (res.status === 401) {
        onLogout();
      } else {
        setError(json.message || 'Failed to load enquiries.');
      }
    } catch {
      setError('Unable to reach the server.');
    } finally {
      setLoading(false);
    }
  }, [token, onLogout]);

  useEffect(() => { fetchEnquiries(); }, [fetchEnquiries]);

  // Stats
  const total     = enquiries.length;
  const countNew  = enquiries.filter((e) => !e.status || e.status === 'new').length;
  const countDone = enquiries.filter((e) => e.status === 'enrolled').length;

  // Unique courses for filter
  const uniqueCourses = [...new Set(enquiries.map((e) => e.course).filter(Boolean))];

  // Filter + search
  const filtered = enquiries.filter((e) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      (e.student_name || '').toLowerCase().includes(q) ||
      (e.mobile_number || '').includes(q) ||
      (e.email || '').toLowerCase().includes(q) ||
      (COURSE_LABELS[e.course] || e.course || '').toLowerCase().includes(q);
    const matchStatus = !filterStatus || e.status === filterStatus || (!e.status && filterStatus === 'new');
    const matchCourse = !filterCourse || e.course === filterCourse;
    return matchSearch && matchStatus && matchCourse;
  });

  return (
    <div className="dash">
      {/* Header */}
      <header className="dash-header">
        <div className="dash-header__brand">
          <div className="dash-header__logo">KA</div>
          <div>
            <h1 className="dash-header__title">Admin Dashboard</h1>
            <p className="dash-header__sub">Khaki Academy · Admissions Enquiries</p>
          </div>
        </div>
        <button className="dash-header__logout" onClick={onLogout}>
          <LogOut size={16} /> Sign Out
        </button>
      </header>

      <main className="dash-main">
        {/* Stat cards */}
        <div className="dash-stats">
          <StatCard icon={Users}       label="Total Enquiries"  value={total}     accent="dash-stat--navy" />
          <StatCard icon={Clock}       label="New / Unread"     value={countNew}  accent="dash-stat--gold" />
          <StatCard icon={CheckCircle} label="Enrolled"         value={countDone} accent="dash-stat--green" />
        </div>

        {/* Toolbar */}
        <div className="dash-toolbar">
          <div className="dash-search">
            <Search size={15} className="dash-search__icon" />
            <input
              type="text"
              placeholder="Search by name, phone, email, course…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="dash-search__clear" onClick={() => setSearch('')} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="dash-filters">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="enrolled">Enrolled</option>
              <option value="not_interested">Not Interested</option>
            </select>
            <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}>
              <option value="">All Courses</option>
              {uniqueCourses.map((c) => (
                <option key={c} value={c}>{COURSE_LABELS[c] || c}</option>
              ))}
            </select>
            <button className="dash-refresh" onClick={fetchEnquiries} aria-label="Refresh">
              <RefreshCw size={15} />
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="dash-loading">
            <span className="dash-loading__spinner" />
            <span>Loading enquiries…</span>
          </div>
        ) : error ? (
          <div className="dash-error">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="dash-empty">
            {enquiries.length === 0
              ? 'No enquiries received yet.'
              : 'No results match your search or filter.'}
          </div>
        ) : (
          <div className="dash-table-wrap">
            <p className="dash-count">
              Showing <strong>{filtered.length}</strong> of {total} enquiries
            </p>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Student / Date</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <EnquiryRow
                    key={row.id}
                    row={row}
                    expanded={expandedId === row.id}
                    onToggle={() => setExpandedId((id) => id === row.id ? null : row.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
