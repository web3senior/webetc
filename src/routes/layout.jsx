import { useEffect, useState } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuth, chainID } from './../contexts/AuthContext'
import styles from './Layout.module.scss'
import Logo from '../../public/upnote.svg'
export default function Root() {
  const [network, setNetwork] = useState()
  const location = useLocation()
  const noHeader = ['/', '/splashscreen', '/tour']
  const auth = useAuth()

  useEffect(() => {
    chainID().then((res) => {
      let networkType
      switch (res) {
        case 4201:
          networkType = `TESTNET`
          break
        case 42:
          networkType = `MAINNET`
          break
        default:
          break
      }
      setNetwork(networkType)
    })
  }, [])

  return (
    <>
      <Toaster />
      {!noHeader.includes(location.pathname) && (
        <>
          {network && (
            <div className={`d-flex align-items-center justify-content-center ${styles.network}`} data-type={network}>
              {network === 'MAINNET' ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM11.3584 5.64645C11.1849 5.47288 10.9154 5.4536 10.7206 5.58859L10.6513 5.64645L7 9.298L5.35355 7.65131L5.28431 7.59346C5.08944 7.45846 4.82001 7.47775 4.64645 7.65131C4.47288 7.82488 4.4536 8.09431 4.58859 8.28917L4.64645 8.35842L6.64645 10.3584L6.71569 10.4163C6.8862 10.5344 7.1138 10.5344 7.28431 10.4163L7.35355 10.3584L11.3584 6.35355L11.4163 6.28431C11.5513 6.08944 11.532 5.82001 11.3584 5.64645Z"
                      fill="#0E700E"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.68149 0.785435C7.24892 -0.261875 8.75196 -0.261795 9.31928 0.785573L15.8198 12.7865C16.3612 13.786 15.6375 15.0009 14.5009 15.0009H1.4982C0.361474 15.0009 -0.362172 13.7858 0.179337 12.7864L6.68149 0.785435ZM8.5 5.5C8.5 5.22386 8.27614 5 8 5C7.72386 5 7.5 5.22386 7.5 5.5V9.5C7.5 9.77614 7.72386 10 8 10C8.27614 10 8.5 9.77614 8.5 9.5V5.5ZM8.75 11.75C8.75 11.3358 8.41421 11 8 11C7.58579 11 7.25 11.3358 7.25 11.75C7.25 12.1642 7.58579 12.5 8 12.5C8.41421 12.5 8.75 12.1642 8.75 11.75Z"
                      fill="#DA3B01"
                    />
                  </svg>
                </>
              )}
              {network}
            </div>
          )}

          <header className={`${styles.header} d-flex align-items-center justify-content-between`}>
            <ul className={`${styles.header__logo} d-flex align-items-center`}>
              <li>
                <Link to={`/`}>
                  <figure>
                    <img src={Logo} alt={`upcard`} />
                  </figure>
                </Link>
              </li>
              <li className="d-flex flex-column">
                <b>Webet</b>
                <small>Bet now</small>
              </li>
            </ul>

            <ul className={`d-flex flex-column align-items-center`}>
              <li>{auth.profile && `🆙@${auth.profile.value.LSP3Profile.name}`}</li>
              <li>{auth.wallet && `${auth.wallet.slice(0, 4)}...${auth.wallet.slice(38)}`}</li>
            </ul>

  
          </header>
        </>
      )}

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer} />
    </>
  )
}
