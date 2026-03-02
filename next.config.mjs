import { execSync } from "node:child_process";

function normalizeBasePath(value) {
  if (!value || value === "/") {
    return "";
  }

  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

function getRepositoryNameFromRemote() {
  try {
    const remoteUrl = execSync("git config --get remote.origin.url", {
      encoding: "utf8"
    }).trim();
    const match = remoteUrl.match(/\/([^/]+?)(?:\.git)?$/);

    return match?.[1] ?? "";
  } catch {
    return "";
  }
}

function getGithubPagesBasePath() {
  const explicitBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.BASE_PATH;

  if (explicitBasePath !== undefined) {
    return normalizeBasePath(explicitBasePath);
  }

  const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? getRepositoryNameFromRemote();

  if (!repository || repository.endsWith(".github.io")) {
    return "";
  }

  return normalizeBasePath(repository);
}

const basePath = process.env.NODE_ENV === "development" ? "" : getGithubPagesBasePath();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined
};

export default nextConfig;
