export async function restFetch<T>(endpoint: string): Promise<T> {
    const response = await fetch(endpoint);
    const result = await response.json();

    if (result.errors) {
        throw new Error(result.errors[0].message);
    }

    return result as T;
}