export interface INotification {
  id: string
  email: string | null
  config_id: string
  user_id: string | null
  status: string
  title: string
  message: string
  sub_message: string | null
  created_at: string
  sent_at: string
  viewed_at: string | null
  type: string | null
  avatar: string | null
  priority: 1 | 0
}
