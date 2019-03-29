import React from 'react'
import { graphql } from 'gatsby'
import ShowCase from '../components/showcase'

const IndexPage = (props) => (
  <ShowCase {...props} />
)

export default IndexPage

export const query = graphql`
  query AdultsQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }, filter: { categoryId: { eq: 1 } }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
