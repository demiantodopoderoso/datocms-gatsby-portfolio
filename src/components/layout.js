import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from "gatsby"
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { slide as Menu } from 'react-burger-menu'
import { isBrowser } from 'react-device-detect'
import { FaBars } from 'react-icons/fa'

import '../styles/index.sass'

const TemplateWrapper = ({ children }) => (
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
        <div className="container__sidebar">
          <div className="sidebar">
            {logo}
            {intro}
            {menu}
            {social}
            {copyright}
          </div>
        </div>
        <div className="container__body">
          {!isBrowser && (
            <Menu
              customBurgerIcon={FaBars()}
              overlayClassName='menu__overlay'
              width='70%'
              className='burger-menu'
            >
              {logo}
              {menu}
              {social}
            </Menu>
          )}
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
)

TemplateWrapper.propTypes = {
  children: PropTypes.object,
}

export default TemplateWrapper
