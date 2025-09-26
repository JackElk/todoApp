export async function restFetch(endpoint) {
    const response = await fetch(endpoint);
    const result = await response.json();

    if (result.errors) {
        throw new Error(result.errors[0].message);
    }

    return result;
}