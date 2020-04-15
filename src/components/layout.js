import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from "gatsby"
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { slide as Menu } from 'react-burger-menu'
import { FaBars } from 'react-icons/fa'
import Modal from 'react-responsive-modal'

import '../styles/index.sass'

class TemplateWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalOpen: false,
    }

    this.onModalClose = this.onModalClose.bind(this)
    this.renderModal = this.renderModal.bind(this)
  }

  componentDidMount() {
    const visited = localStorage['la-tienda-de-elita-visited-40']
    let modalOpen = false
    if (!visited || visited === 'false') {
      modalOpen = true
      localStorage['la-tienda-de-elita-visited-40'] = true
    }
    this.setState({
      modalOpen,
    })
  }

  onModalClose() {
    this.setState({
      modalOpen: false,
    })
  }

  renderModal(data) {
    const { modalOpen } = this.state
    return (
      <Modal open={modalOpen} onClose={this.onModalClose}>
        <div className="modal__container">
          <div className="modal__logo">
            <img
              src={data.datoCmsSite.theme.logo.url}
              alt={data.datoCmsSite.globalSeo.siteName}
            />
          </div>
          <h1 className="modal__title">¡Bienvenido/a a La Tienda de Elita!</h1>
          <h4 className="modal__info_warning">
            Debido a la cuarentena de algunas comunas,
            estamos haciendo SOLO despachos a domicilio los días miércoles.
          </h4>
          <h3 className="modal__subtitle">¿Qué quieres ver?</h3>
          <div className="modal__menu">
            <ul>
              <li>
                <Link to="/mobiliario-infantil">Mobiliario infantil</Link>
              </li>
              <li>
                <Link to="/mobiliario-adulto">Mobiliario adulto</Link>
              </li>
              <li>
                <Link to="/mascotas">Mascotas</Link>
              </li>
              <li className="see-more">
                <Link to="/">Ver todo</Link>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    )
  }

  render() {
    const { children } = this.props
    return (
      <StaticQuery query={graphql`
        query LayoutQuery
        {
          datoCmsSite {
            globalSeo {
              siteName
            }
            theme {
              logo {
                url
              }
            }
            faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          datoCmsHome {
            seoMetaTags {
              ...GatsbyDatoCmsSeoMetaTags
            }
            introTextNode {
              childMarkdownRemark {
                html
              }
            }
            copyright
          }
          allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
            edges {
              node {
                profileType
                url
              }
            }
          }
        }
      `}
      render={data => {
        const logo = (
          <h6 className="sidebar__title">
            <Link to="/">
              <img src={data.datoCmsSite.theme.logo.url} alt={data.datoCmsSite.globalSeo.siteName} />
            </Link>
          </h6>
        )
        const intro = (
          <div
            className="sidebar__intro"
            dangerouslySetInnerHTML={{
              __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html,
            }}
          />
        )
        const menu = (
          <ul className="sidebar__menu">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/mobiliario-infantil">Mobiliario infantil</Link>
            </li>
            <li>
              <Link to="/mobiliario-adulto">Mobiliario adulto</Link>
            </li>
            <li>
              <Link to="/mascotas">Mascotas</Link>
            </li>
            <li>
              <Link to="/about">Quiénes somos</Link>
            </li>
          </ul>
        )
        const social = (
          <p className="sidebar__social">
            {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
              <a
                key={profile.profileType}
                href={profile.url}
                target="blank"
                className={`social social--${profile.profileType.toLowerCase()}`}
              > </a>
            ))}
          </p>
        )
        const copyright = (
          <div className="sidebar__copyright">{data.datoCmsHome.copyright}</div>
        )
        return (
          <div className="container">
            <HelmetDatoCms
              favicon={data.datoCmsSite.faviconMetaTags}
              seo={data.datoCmsHome.seoMetaTags}
            />
            {this.renderModal(data)}
            <div className="container__sidebar">
              <div className="sidebar">
                {logo}
                {intro}
                {menu}
                {social}
                {copyright}
              </div>
            </div>
            <Menu
              width='70%'
              customBurgerIcon={FaBars()}
              className='burger-menu'
            >
              {logo}
              {menu}
              {social}
            </Menu>
            <div className="container__body">
              <div className="container__mobile-header">
                <div className="mobile-header">
                  <div className="mobile-header__logo">
                    <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
                  </div>
                </div>
              </div>
              {children}
            </div>
          </div>
        )
      }}
    />
  )}
}

TemplateWrapper.propTypes = {
  children: PropTypes.object,
}

export default TemplateWrapper
