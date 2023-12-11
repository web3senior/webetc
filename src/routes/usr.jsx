import { Suspense, useState, useEffect } from 'react'
import { useLoaderData, defer, Await, Link, useParams } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import LoadingSpinner from './components/LoadingSpinner'
import toast from 'react-hot-toast'
import { useAuth } from './../contexts/AuthContext'
import Shimmer from './helper/Shimmer'
import Icon from './helper/MaterialIcon'
import Web3 from 'web3'
import { getNote } from './../util/api'
import styles from './Usr.module.scss'
import Loading from './components/LoadingSpinner'

const web3 = new Web3(window.ethereum)

export const loader = async ({ request, params }) => {
  return defer({
    someDataHere: [],
  })
}

export default function Profile({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()
  const auth = useAuth()
  const params = useParams()

  const fetchWinner = async (id) => {
    let toastP = toast.loading(`Sending request...`)
    var contract = new web3.eth.Contract(
      [
        {
          inputs: [],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          inputs: [],
          name: 'EmptyArgs',
          type: 'error',
        },
        {
          inputs: [],
          name: 'EmptySource',
          type: 'error',
        },
        {
          inputs: [],
          name: 'NoInlineSecrets',
          type: 'error',
        },
        {
          inputs: [],
          name: 'OnlyRouterCanFulfill',
          type: 'error',
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: 'requestId',
              type: 'bytes32',
            },
          ],
          name: 'UnexpectedRequestID',
          type: 'error',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
          ],
          name: 'OwnershipTransferRequested',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
          ],
          name: 'OwnershipTransferred',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'id',
              type: 'bytes32',
            },
          ],
          name: 'RequestFulfilled',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'id',
              type: 'bytes32',
            },
          ],
          name: 'RequestSent',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'bytes32',
              name: 'requestId',
              type: 'bytes32',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'character',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'bytes',
              name: 'response',
              type: 'bytes',
            },
            {
              indexed: false,
              internalType: 'bytes',
              name: 'err',
              type: 'bytes',
            },
          ],
          name: 'Response',
          type: 'event',
        },
        {
          inputs: [],
          name: 'acceptOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'character',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes32',
              name: 'requestId',
              type: 'bytes32',
            },
            {
              internalType: 'bytes',
              name: 'response',
              type: 'bytes',
            },
            {
              internalType: 'bytes',
              name: 'err',
              type: 'bytes',
            },
          ],
          name: 'handleOracleFulfillment',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 's_lastError',
          outputs: [
            {
              internalType: 'bytes',
              name: '',
              type: 'bytes',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 's_lastRequestId',
          outputs: [
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 's_lastResponse',
          outputs: [
            {
              internalType: 'bytes',
              name: '',
              type: 'bytes',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint64',
              name: 'subscriptionId',
              type: 'uint64',
            },
            {
              internalType: 'string[]',
              name: 'args',
              type: 'string[]',
            },
          ],
          name: 'sendRequest',
          outputs: [
            {
              internalType: 'bytes32',
              name: 'requestId',
              type: 'bytes32',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
          ],
          name: 'transferOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      '0xBab7309F6e871b3cD015f43f1774C1F95679CF8E'
    )

    //  return await contract.methods.character().call()

     await contract.methods
      .sendRequest(`1130`, [id])

      .send({ from: '0xbbeeed010f67978D410ceFdB416Ca5F0207fad9c' })
      .then(console.log)

      return await contract.methods.character().call().then (res =>{
        toast.success(res, {icon: '🎉', duration: 10000})
        toast.dismiss(toastP);
      })
  }

  const getSport = async () => {
    var myHeaders = new Headers()
    myHeaders.append('accept', 'application/json')

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }

    return await fetch('https://api.the-odds-api.com/v4/sports/americanfootball_nfl/scores?apiKey=344ad46ce094d10288a4e410a65f18c0&daysFrom=3&dateFormat=iso', requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log('error', error))
  }

  useEffect(() => {
    getSport(params.addr).then((result) => {
      setData(result)
    })
  }, [])

  return (
    <section className={`${styles.section} animate fade`}>
      <div className={`${styles.assetItem} grid grid--fill`} style={{ '--data-width': '250px' }}>
        {data &&
          data.length > 0 &&
          data.map((item, i) => {
            return (
              <div key={i}>
                <div className="card mt-10">
                  <div className="card__header">
                    <b>{item.sport_title}</b> {item.commence_time}
                    <br />
                  </div>
                  <div className="card__body">
                    <p>
                      Home Team: <span className="badge badge-warning">{item.home_team} </span>
                    </p>
                    <p>
                      Away Team: <span className="badge badge-info">{item.home_team}</span>
                    </p>
                    <p>
                      Is completed?
                      {item.completed ? <span className="alert alert--success">Yes</span> : <span className="alert alert--danger">No</span>}
                    </p>

                    {item.completed && (
                      <p>
                        <table className="mt-20" style={{ width: '100%' }}>
                          <thead>
                            <tr>
                              <td>Team Name</td>
                              <td>Score</td>
                            </tr>
                          </thead>
                          <tbody>
                            {item.scores.map((item) => {
                              return (
                                <tr>
                                  <td>{item.name}</td>
                                  <td>{item.score}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                        <button onClick={()=>fetchWinner(item.id)}>Fetch Winner</button>
                        <small style={{ opacity: '.2' }}>{item.id}</small>
                      </p>
                    )}

                    {!item.completed && (
                      <>
                        <button style={{background:'red', color:'#fff'}}>Bet now</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </section>
  )
}
