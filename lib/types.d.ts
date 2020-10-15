type Finding = {
  version: string;
};

type Advisory = {
  module_name: string; // eslint-disable-line camelcase
  title: string;
  severity: string;
  cwe: string;
  url: string;
  findings: Finding[];
};

type Advisories = {
  find: (name: string, version: string) => Advisory | undefined;
};

type AuditReport = {
  advisories: Record<string, Advisory>;
};

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
  updated: Array<
    | {
        name: string;
        version: string;
        previousVersion: string;
      }
    | {
        name: string;
        version: string;
        previousVersion: string;
        severity: string;
        title: string;
        url: string;
      }
  >;
  packageCount: number;
  packageUrls: Record<string, UrlInfo>;
};
