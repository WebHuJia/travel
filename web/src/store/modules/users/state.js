var state = {
  username: '',
  encryptionusername: '',
  encryptionuseremail: '',
  token: '',
  user_email: '',
  mobile: '',
  uid: '',
  password: '',
  Invitecode: '',
  intersmsiso: '',
  device_type: 'web',
  logout: false,
  subhead: '',
  subsubhead: '',
  ga: false,
  menuTitle: '',
  menuList: [
    {
      name: 'menu.collect.title',
      url: 'Collect'
    },
    {
      name: 'menu.investment.title',
      url: 'Investment'
    },
    {
      name: 'menu.accountsecurity.title',
      url: 'AccountSecurity'
    },
    {
      name: 'menu.kyc.title',
      url: 'Kyc'
    },
    {
      name: 'menu.mentiontoken.title',
      url: 'MentionToken'
    },
    {
      name: 'menu.invitation.title',
      url: 'Invitation'
    }
  ],
  errorText: '',
  error:{
    accout: false,
    password: false,
    code: false,
    codeBtn: false,
    googlecode: false,
    tokenvalue: false,
    quantitynum: false
  }
}
export default state
