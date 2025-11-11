export async function graphqlFetch<T, V = Record<string, unknown>>(endpoint: string, query: string, variables?: V): Promise<T> {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query,
            variables,
        })
    });
    const result = await response.json();

    if (result.errors) {
        throw new Error(result.errors[0].message);
    }

    return result.data as T;
}