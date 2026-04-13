import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { WORKSHOPS, COMMENTS } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

export default function WorkshopDetails({ user, toast }) {
  const { id }      = useParams();
  const workshop    = WORKSHOPS.find(w => w.id === Number(id));
  const [comments, setComments] = useState(
    COMMENTS.filter(c => c.workshop_id === Number(id))
  );
  const [commentText, setCommentText] = useState('');
  const [posting, setPosting]         = useState(false);

  if (!workshop) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🔍</p>
          <h1 className="text-xl font-bold text-[var(--color-textbase)]">Workshop not found</h1>
          <Link to="/status" className="text-[var(--color-primary)] text-sm mt-3 inline-block hover:underline">
            ← Back
          </Link>
        </div>
      </div>
    );
  }

  const { workshop_type, date, status, coordinator, instructor } = workshop;
  const formatted = new Date(date).toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const postComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setPosting(true);
    await new Promise(r => setTimeout(r, 600));
    setComments(c => [...c, {
      id: Date.now(), author: `${user.first_name} ${user.last_name}`,
      comment: commentText, public: true,
      created_date: new Date().toISOString(), workshop_id: Number(id),
    }]);
    setCommentText('');
    setPosting(false);
    toast?.success('Comment posted!');
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-up">

        <Link to={user?.is_instructor ? '/dashboard' : '/status'}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)]
                     hover:text-[var(--color-primary)] transition-colors mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Dashboard
        </Link>

        {/* Main card */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl font-bold gradient-text">{workshop_type.name}</h1>
              <p className="text-sm text-[var(--color-muted)] mt-1">
                {workshop_type.duration} day{workshop_type.duration > 1 ? 's' : ''} workshop
              </p>
            </div>
            <StatusBadge status={status} />
          </div>

          {/* Detail grid */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InfoItem label="Scheduled Date" value={formatted} />
            <InfoItem label="Coordinator" value={coordinator.name} sub={coordinator.email} />
            {instructor
              ? <InfoItem label="Instructor" value={instructor.name} sub={instructor.email} />
              : <InfoItem label="Instructor" value="Not yet assigned" muted />
            }
            <InfoItem label="Workshop Description"
              value={workshop_type.description}
              className="sm:col-span-2" />
          </dl>
        </div>

        {/* Comments */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6">
          <h2 className="font-semibold text-[var(--color-textbase)] mb-5">
            Comments
            <span className="ml-2 text-xs bg-[var(--color-surface2)] text-[var(--color-muted)]
                             px-2 py-0.5 rounded-full border border-[var(--color-border)]">
              {comments.length}
            </span>
          </h2>

          {/* Comment list */}
          {comments.length === 0 ? (
            <p className="text-sm text-[var(--color-muted)] text-center py-8">No comments yet.</p>
          ) : (
            <div className="flex flex-col gap-4 mb-6">
              {comments.map(c => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]
                                  flex items-center justify-center text-white font-bold text-xs shrink-0 mt-0.5">
                    {c.author[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-[var(--color-textbase)]">{c.author}</p>
                      <p className="text-xs text-[var(--color-muted)]">
                        {new Date(c.created_date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">{c.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comment form */}
          <form id="comment-form" onSubmit={postComment}
            className="flex flex-col gap-3 pt-4 border-t border-[var(--color-border)]">
            <textarea
              id="id_comment"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              rows={3}
              placeholder="Add a comment…"
              className="w-full bg-[var(--color-surface2)] border border-[var(--color-border)]
                         rounded-xl px-4 py-3 text-sm text-[var(--color-textbase)]
                         placeholder:text-[var(--color-muted)] resize-none outline-none
                         focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20
                         transition-all duration-200"
            />
            <button
              id="comment-submit"
              type="submit"
              disabled={posting || !commentText.trim()}
              className="self-end px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                         bg-[var(--color-primary)] hover:bg-[var(--color-primary-dk)]
                         hover:-translate-y-0.5 hover:shadow-glow
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200"
            >
              {posting ? 'Posting…' : 'Post Comment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, sub, muted, className = '' }) {
  return (
    <div className={className}>
      <dt className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-1">{label}</dt>
      <dd className={`text-sm font-medium leading-relaxed ${muted ? 'text-[var(--color-muted)] italic' : 'text-[var(--color-textbase)]'}`}>
        {value}
        {sub && <span className="block text-xs text-[var(--color-muted)] font-normal mt-0.5">{sub}</span>}
      </dd>
    </div>
  );
}
