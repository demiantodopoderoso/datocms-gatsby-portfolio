import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ShowCase from '../components/showcase'

const IndexPage = (props) => (
  <Layout>
    <div className="mobile-intro">
      <div
        className="sidebar__intro"
        dangerouslySetInnerHTML={{
          __html: props.data.datoCmsHome.introTextNode.childMarkdownRemark.html,
        }}
      />
    </div>
    <ShowCase {...props} />
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
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
    datoCmsHome {
      introTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
