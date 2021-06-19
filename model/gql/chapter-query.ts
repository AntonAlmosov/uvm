import { gql } from "@apollo/client";

export const chapterQuery = gql`
  query Chapter($id: ID!) {
    chapter(id: $id) {
      title
      emoji
      description
      text
      index
    }
  }
`;
