export default null

// // import { useState } from 'react'
// import Wallet from 'src/components/wallet/Wallet'
// import { useLocales } from 'src/locales'

// export default function AccountCryptoSafe() {
//   const { translate } = useLocales()

//   /*
//   const [open, setOpen] = useState(false)

//   const handleOpen = () => {
//     setOpen(true)
//   }

//   const handleClose = () => {
//     setOpen(false)
//   }
//   */

//   return (
//     <Card sx={{ p: 3 }}>
//       <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
//         {translate('wallet.gigacounts_crypto_balance')}
//       </Typography>
//       <Typography paragraph>
//         {translate('wallet.wallet_this_is')}{' '}
//         <Link target="_blank" href="https://help.safe.global/en/collections/9801-getting-started">
//           Gnosis Safe
//         </Link>{' '}
//         {translate('wallet.gnosis_explain_1')}{' '}
//         <Link
//           target="_blank"
//           href="https://www.coinbase.com/learn/tips-and-tutorials/how-to-send-crypto"
//         >
//           {translate('wallet.gnosis_instructions')}.
//         </Link>
//       </Typography>
//       <Wallet
//         address=""
//         label={translate('wallet.gnosis_label')}
//         icon="/assets/icons/wallet/ic_safe.svg"
//         isVerified={false}
//         wrongAddress={false}
//         chainLabel=""
//       />
//     </Card>
//   )
// }
