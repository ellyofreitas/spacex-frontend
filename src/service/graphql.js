/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
const baseURL = 'https://api.spacex.land/graphql';

export async function fetchGraphQLHelper(query, variables) {
  const response = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return await response.json();
}
