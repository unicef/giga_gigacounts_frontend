import { Button, ComboBox } from '@carbon/react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'
import { IRole, UserRoles } from 'src/@types'
import { getUserRoles, postNotVerifiedForm } from 'src/api/user'
import { useAuthContext } from 'src/auth/useAuthContext'
import { ActionLink } from 'src/components/action'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { isIspRole } from 'src/utils/roles'
import { capitalizeFirstLetter } from 'src/utils/strings'

export default function NotVerifiedPage() {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const { user, setUser, logout } = useAuthContext()
  const navigate = useNavigate()
  const { internetProviders } = useBusinessContext()
  const { pushSuccess, pushError } = useSnackbar()
  const [ispId, setIspId] = useState<string>(user?.isp?.id ?? '')
  const [roleCode, setRoleCode] = useState<UserRoles | ''>(user?.role?.code ?? '')
  const [roleOptions, setRoleOptions] = useState<Omit<IRole, 'permissions'>[] | null>(null)
  const [hasCompletedForm, setHasCompletedForm] = useState(Boolean(user?.role))

  useEffect(() => {
    if (isIspRole(user?.role.code)) setHasCompletedForm((prev) => prev && true)
  }, [user?.role.code])

  const sortedRoles =
    roleOptions?.length && roleOptions.length > 0
      ? roleOptions.filter((r) => r).sort((a, b) => a.name.localeCompare(b.name))
      : []

  useEffect(() => {
    if (user && user.approved) navigate('/')
    getUserRoles().then((res) => {
      if (res.length === 1) setRoleCode(res[0].code)
      setRoleOptions(res)
    })
  }, [user, navigate])

  const handleSubmit = () => {
    postNotVerifiedForm(roleCode, ispId)
      .then(() => {
        setUser((prev) => ({
          ...prev,
          role: roleOptions?.find((r) => r.code === roleCode),
          ispId: internetProviders?.find((c) => c.id === ispId)
        }))
        setHasCompletedForm(true)
        pushSuccess('push.credentials_sent')
      })
      .catch(() => pushError('push.credentials_sent_error'))
  }

  return (
    <>
      <Helmet>
        <title> Not verified | Gigacounts</title>
      </Helmet>
      <Stack orientation="horizontal">
        <Stack
          orientation="vertical"
          alignItems="center"
          justifyContent="center"
          style={{ width: '100%', textAlign: 'center' }}
        >
          <Typography
            as="h1"
            style={{ fontSize: '32px', fontWeight: '500', marginBottom: spacing.xl }}
          >
            {translate('page_error.notVerified.title')}
          </Typography>

          <Typography
            style={{ fontSize: '28px', fontWeight: '300', marginBottom: spacing.md }}
            variant="textSecondary"
          >
            {hasCompletedForm
              ? translate('page_error.notVerified.content')
              : translate('page_error.notVerified.contentWithoutRoleAndCountry')}
          </Typography>

          {hasCompletedForm && (
            <Stack orientation="horizontal" gap={50}>
              <ActionLink
                size={24}
                icon="Back"
                description="go_back"
                onClick={() => setHasCompletedForm(false)}
              />
              <ActionLink size={24} icon="Logout" description="log_out" onClick={logout} />
            </Stack>
          )}

          {!hasCompletedForm && (
            <Stack orientation="vertical" style={{ width: '50%' }} gap={spacing.lg}>
              <ComboBox
                id="user-role-select"
                items={sortedRoles}
                itemToString={(r) => r?.name ?? ''}
                selectedItem={roleOptions?.find((r) => r.code === roleCode) ?? null}
                onChange={({ selectedItem }) => {
                  setRoleCode(selectedItem?.code ?? '')
                }}
                disabled={sortedRoles.length <= 1}
                placeholder={capitalizeFirstLetter(translate('role'))}
              />
              {isIspRole(roleCode) && (
                <ComboBox
                  id="not-verified-isp-combo-box"
                  onChange={({ selectedItem }) => {
                    setIspId(selectedItem?.id ?? '')
                  }}
                  selectedItem={internetProviders.find((c) => c.id === ispId) ?? null}
                  items={[...internetProviders].sort((a, b) => a.name.localeCompare(b.name))}
                  itemToString={(c) =>
                    c &&
                    typeof c === 'object' &&
                    'name' in c &&
                    c.name &&
                    typeof c.name === 'string'
                      ? c.name
                      : ''
                  }
                  placeholder={capitalizeFirstLetter(translate('isp'))}
                />
              )}
              <Stack orientation="horizontal" justifyContent="space-between">
                <ActionLink size={24} icon="Logout" description="log_out" onClick={logout} />
                <Button
                  disabled={!roleCode}
                  onClick={handleSubmit}
                  style={{ alignSelf: 'flex-end' }}
                >
                  {capitalizeFirstLetter(translate('send'))}
                </Button>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  )
}
