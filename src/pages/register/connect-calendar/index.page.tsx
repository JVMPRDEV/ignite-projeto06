import { Heading, Text, MultiStep, Button } from '@ignite-ui/react'
import { ArrowRight, Check } from 'phosphor-react'

import { signIn, useSession } from 'next-auth/react'
import { Container, Header } from '../styles'
import { ConnectItem, ConnectBox, AuthError } from './styles'
import { useRouter } from 'next/router'

export default function ConnectCalender() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalender() {
    await signIn('google')
  }

  async function handleNavigateNextStep() {
    await router.push('/register/time-intervals')
  }

  return (
    <>
      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda</Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos á medida em que são agendados.
          </Text>

          <MultiStep size={4} currentStep={2} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calender</Text>
            {isSignedIn ? (
              <Button size="sm" disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleConnectCalender}
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>

          {hasAuthError && (
            <AuthError size="sm">
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calender.
            </AuthError>
          )}

          <Button
            type="submit"
            disabled={!isSignedIn}
            onClick={handleNavigateNextStep}
          >
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
