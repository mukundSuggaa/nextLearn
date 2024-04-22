const HASURA_OPERATION = `
mutation ($name: String!, $email:String!, $image_url:String!){
  insert_customers(objects: {
    name:$name,
    email:$email,
    image_url:$image_url,
  }) {
    affected_rows
    returning {
      id
    }
  }
}
`;

const DSCOUNT_ACTION = `
type Mutation {
  applyDiscountToInvoice(id: String!): DiscountedAmount
}
`;
export const createCustomer = async (variables: any) => {
  const fetchResponse = await fetch(
    'https://intimate-bat-33.hasura.app/v1/graphql',
    {
      method: 'POST',
      headers: {
        'X-Hasura-Admin-Secret':
          'nJNXqC7u58hK0vt6hKZyWUqQkPjEZ8sri2p3pJsXfA7KJd2i3yHcvM4Link1IkdV',
      },
      body: JSON.stringify({
        query: HASURA_OPERATION,
        variables,
      }),
    },
  );
  const data = await fetchResponse.json();
  console.log('DEBUG: ', data);
  return data;
};
