import Link from "next/link";

interface Props {
  reviewerSlug?: string;
  reviewerName?: string;
  lastUpdated?: string;
}

export function ReviewedByByline({
  reviewerSlug = "editorial-board",
  reviewerName = "Peppu Studio Research Desk",
  lastUpdated,
}: Props) {
  return (
    <div
      style={{
        fontFamily: "var(--font-pixel)",
        fontSize: 9,
        letterSpacing: "0.12em",
        background: "var(--paper)",
        border: "3px solid var(--ink)",
        padding: "10px 14px",
        marginBottom: 14,
        lineHeight: 1.6,
      }}
    >
      <span style={{ opacity: 0.6 }}>REVIEWED BY · </span>
      <Link
        href={`/reviewers/${reviewerSlug}`}
        style={{ color: "var(--ink)", textDecoration: "underline" }}
      >
        {reviewerName.toUpperCase()}
      </Link>
      {lastUpdated && (
        <>
          <span style={{ margin: "0 8px", opacity: 0.4 }}>·</span>
          <span style={{ opacity: 0.6 }}>LAST UPDATED · {lastUpdated.toUpperCase()}</span>
        </>
      )}
    </div>
  );
}
