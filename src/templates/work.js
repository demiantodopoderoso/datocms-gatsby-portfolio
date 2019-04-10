import React, { Component } from 'react'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Modal from 'react-responsive-modal'

class Work extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageModalOpen: false,
      imageModalSrc: null,
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.renderModal = this.renderModal.bind(this)
  }

  openModal(image) {
    this.setState({
      imageModalOpen: true,
      imageModalSrc: image,
    })
  }

  closeModal() {
    this.setState({
      imageModalOpen: false,
    })
  }

  renderModal() {
    const { data } = this.props
    const {
      imageModalOpen,
      imageModalSrc,
    } = this.state

    return (
      <Modal open={imageModalOpen} onClose={this.closeModal}>
        <div className="image-modal__container">
          <img alt={data.datoCmsWork.title} key={imageModalSrc} src={imageModalSrc} />
        </div>
      </Modal>
    )
  }

  render() {
    const { data } = this.props
    return (
      <Layout>
        <article className="sheet">
          <HelmetDatoCms seo={data.datoCmsWork.seoMetaTags} />
          {this.renderModal()}
          <div className="sheet__inner">
            <h1 className="sheet__title">{data.datoCmsWork.title}</h1>
            <p className="sheet__lead">{data.datoCmsWork.excerpt}</p>
            <div className="sheet__slider">
              <Slider
                infinite={true}
                speed={500}
                slidesToShow={2}
                autoplay
                dots
                arrows
              >
                {data.datoCmsWork.gallery.map(({ fluid }) => (
                  <button className="gallery-btn" onClick={() => this.openModal(fluid.src)}>
                    <img alt={data.datoCmsWork.title} key={fluid.src} src={fluid.src} />
                  </button>
                ))}
              </Slider>
            </div>
            <div
              className="sheet__body"
              dangerouslySetInnerHTML={{
                __html: data.datoCmsWork.descriptionNode.childMarkdownRemark.html,
              }}
            />
            <div className="sheet__gallery">
              <Img fluid={data.datoCmsWork.coverImage.fluid} />
            </div>
          </div>
        </article>
      </Layout>
    )
  }
}

export default Work

export const query = graphql`
  query WorkQuery($slug: String!) {
    datoCmsWork(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      gallery {
        fluid(maxHeight: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`
