import { gql } from "@apollo/client";

export const chapterQuery = gql`
  query Chapter($id: ID! = "1") {
    chapter(id: $id) {
      title
      emoji
      description
      text
    }
  }
`;
