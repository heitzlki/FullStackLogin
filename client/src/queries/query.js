import {gql} from '@apollo/client';

const loginQuery = gql`
query($name: String!, $password: String!)
{login(name: $name, password: $password){name}}
`;

const registerMutation = gql`
mutation($name: String!, $password: String!, $confirmPassword: String!)
{register(name: $name, password: $password, confirmPassword: $confirmPassword){name}}
`;

export {loginQuery, registerMutation};