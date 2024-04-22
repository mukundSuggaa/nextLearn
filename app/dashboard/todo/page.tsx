export default async function Page() {
  const callHasuraAction = async () => {
    try {
      const response = await fetch('https://intimate-bat-33.hasura.app/v1/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': 'nJNXqC7u58hK0vt6hKZyWUqQkPjEZ8sri2p3pJsXfA7KJd2i3yHcvM4Link1IkdV',
        },
        body: JSON.stringify({
          query: `
          mutation($email:String!) {
            blurCustomerImage(email:$email) {
              image_url
            }
          }
          `,
          variables: {
              email:"r2@r.com",
          },
        }),
      });
      const responseData = await response.json();
      if (responseData.errors) {
        console.log("error: ",responseData.errors);
        throw new Error(responseData.errors[0].message);
      }
      const {data: {insert_customers: { returning: result}}} = responseData;
      console.log(result[0]);
      return result[0];
    } catch (error) {
      console.log('error in call hasura action:', error)
    }
  };

  const result = await callHasuraAction();

  return (
    <>
      <p>Customers Page</p>
      <div>
      {result && <div>Action Result: {result.image_url}</div>}
    </div>
    </>
  );
}