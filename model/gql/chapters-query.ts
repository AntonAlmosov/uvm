import { gql } from "@apollo/client";

export const chaptersQuery = gql`
  query Chapters {
    chapters {
      id
      title
      description
      text
    }
  }
`;
