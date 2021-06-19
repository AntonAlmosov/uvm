import { gql } from "@apollo/client";

export const chapterQuery = gql`
  query Chapter($id: ID! = "1") {
    chapter(id: $id) {
      title
      description
      text
    }
  }
`;
