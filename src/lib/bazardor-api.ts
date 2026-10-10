export async function fetchBazardorJson<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, init);

    if (!response.ok) {
        throw new Error(`Bazardor API request failed: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!/application\/(json|[^;]+\+json)/i.test(contentType)) {
        throw new Error(`Bazardor API returned a non-JSON response (${contentType || "unknown content type"})`);
    }

    return response.json() as Promise<T>;
}