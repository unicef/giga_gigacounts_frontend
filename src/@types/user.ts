export type IUserSocialLink = {
  facebookLink: string
  instagramLink: string
  linkedinLink: string
  twitterLink: string
}

export type IUserProfileFollowers = {
  follower: number
  following: number
}

export type IUserProfileCover = {
  name: string
  cover: string
  role: string
}

export type IUserProfileAbout = {
  quote: string
  country: string
  email: string
  role: string
  company: string
  school: string
}

export type IUserProfile = IUserProfileFollowers &
  IUserProfileAbout & {
    id: string
    socialLinks: IUserSocialLink
  }

export type IUserProfileFollower = {
  id: string
  avatarUrl: string
  name: string
  country: string
  isFollowed: boolean
}

export type IUserProfileGallery = {
  id: string
  title: string
  postAt: Date | string | number
  imageUrl: string
}

export type IUserProfileFriend = {
  id: string
  avatarUrl: string
  name: string
  role: string
}

export type IUserProfilePost = {
  id: string
  author: {
    id: string
    avatarUrl: string
    name: string
  }
  isLiked: boolean
  createdAt: Date | string | number
  media: string
  message: string
  personLikes: {
    name: string
    avatarUrl: string
  }[]
  comments: {
    id: string
    author: {
      id: string
      avatarUrl: string
      name: string
    }
    createdAt: Date | string | number
    message: string
  }[]
}

export type IUserCard = {
  id: string
  avatarUrl: string
  cover: string
  name: string
  follower: number
  following: number
  totalPosts: number
  role: string
}

export type IUserAccountGeneral = {
  id: string
  avatarUrl: string
  name: string
  email: string
  phoneNumber: string
  address: string
  country: string
  state: string
  city: string
  zipCode: string
  company: string
  isVerified: boolean
  status: string
  role: string
}

export type IUserAccountBillingCreditCard = {
  id: string
  cardNumber: string
  cardType: string
}

export type IUserAccountBillingInvoice = {
  id: string
  createdAt: Date | string | number
  price: number
}

export type IUserAccountBillingAddress = {
  id: string
  name: string
  phone: string
  country: string
  state: string
  city: string
  street: string
  zipCode: string
}

export type IUserAccountChangePassword = {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

export type IUserAccountNotificationSettings = {
  activityComments: boolean
  activityAnswers: boolean
  activityFollows: boolean
  applicationNews: boolean
  applicationProduct: boolean
  applicationBlog: boolean
}

export enum UserRoles {
  GIGA_ADMIN = 'GIGA.SUPER.ADMIN',
  GIGA_VIEW_ONLY = 'GIGA.VIEW.ONLY',
  ISP_CONTRACT_MANAGER = 'ISP.CONTRACT.MANAGER',
  ISP_CUSTOMER_SERVICE = 'ISP.CUSTOMER.SERVICE',
  COUNTRY_CONTRACT_CREATOR = 'COUNTRY.CONTRACT.CREATOR',
  COUNTRY_ACCOUNTANT = 'COUNTRY.ACCOUNTANT',
  COUNTRY_SUPER_ADMIN = 'COUNTRY.SUPER.ADMIN',
  COUNTRY_MONITOR = 'COUNTRY.MONITOR',
  SCHOOL_CONNECTIVITY_MANAGER = 'SCHOOL.CONNECTIVITY.MANAGER'
}
