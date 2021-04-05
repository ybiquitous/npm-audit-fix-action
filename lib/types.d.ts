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

type Report = {
  added: Array<{ name: string; version: string }>;
  removed: Array<{ name: string; version: string }>;
  updated: Array<{
    name: string;
    version: string;
    previousVersion: string;
    severity: string | null;
    title: string | null;
    url: string | null;
  }>;
  packageCount: number;
  packageUrls: Record<string, UrlInfo>;
};
