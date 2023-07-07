type Finding = {
  version: string;
};

type Vulnerability = {
  name: string;
  severity: string;
  via: Array<{ title: string; url: string }>;
};

type AuditReport = Map<string, { name: string; severity: string; title: string; url: string }>;

type FixEntry = {
  name: string;
  version: string;
};

type FixUpdateEntry = FixEntry & {
  previousVersion: string;
};

type AuditFix = {
  added: FixEntry[];
  removed: FixEntry[];
  updated: FixUpdateEntry[];
  warnings: string[];
  elapsed: number;
};

type UrlInfo = { name: string; url: string; type: string };

type PackageInfo = { name: string; version: string; location: string | null };

type PackageInfoWithAudit = PackageInfo & {
  severity: string | null;
  title: string | null;
  url: string | null;
};

type Report = {
  added: Array<PackageInfo>;
  removed: Array<PackageInfoWithAudit>;
  updated: Array<PackageInfoWithAudit & { previousVersion: string }>;
  packageCount: number;
  packageUrls: Record<string, UrlInfo>;
};
