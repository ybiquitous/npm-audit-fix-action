type Finding = {
  version: string;
};

type Advisory = {
  module_name: string;
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
  advisories: { [packageName: string]: Advisory };
};

type Fix = {
  updated: [];
  added: [];
  removed: [];
  warnings: [];
  elapsed: number;
};
