import { GetServerSideProps } from "next"
import appPreviewImage from '../assets/aplicacao.png'
import Image from "next/image"
import logoImg from '../assets/logo.svg'
import userAvatarExampleImg from '../assets/avatars.png'
import iconCheckedImg from '../assets/icon.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from "react"


type HomeProps = {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')



  async function createPool(event: FormEvent){
    event.preventDefault()

    try {
      const response = await api.post('/pools', {
      title: poolTitle,
    });

    const { code } = response.data

    await navigator.clipboard.writeText(code)

    alert('Bolão criado com sucesso. Código copiado para a área de transferência')

    setPoolTitle('')
  } catch (err) {
    console.log(err)
    alert('Falha ao criar o bolão, tente novamente')
  }
  }

  return (
  <div className="max-w-281 h-screen mx-auto grid grid-cols-2 gap-28 items-center">
    <main>
      <Image src={logoImg} alt="logo do site" className="h-64"/>

      <h1 className="mt-14 text-white text-5xl font-bold leading-tight">Crie seu próprio bolão e compartilhe entre amigos</h1>

      <div className="mt-10 flex items-center  gap-2">
        <Image src={userAvatarExampleImg} alt="pessoas que usam" quality={100}/>

        <strong className="text-gray-100 text-xl">
          <span className="text-green-600">+{userCount}</span> pessoas já estão usando
        </strong>
      </div>

      <form onSubmit={createPool} className="mt-10 flex gap-2">
        <input 
          className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-300"
          type="text" 
          required
          placeholder="Qual nome do seu bolão?"
          onChange={event => setPoolTitle(event.target.value)}
          value={poolTitle}
        />
        <button 
          className="bg-yellow-300 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-400"
          type="submit"
        >Criar meu bolão</button>
      </form>

      <p className="mt-4 text-sm text-gray-300 leading-relaxed">Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas </p>

      <div className="mt-10 pt-10 border-t border-gray-800 flex justify-between text-gray-100 items-center">
        <div className="flex items-center gap-6">
            <Image alt="icone de checado" src={iconCheckedImg}/>
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{poolCount}</span>
              <span>Bolões criados</span>
            </div>
        </div>

        <div className="w-px h-14 bg-gray-800"/>

        <div className="flex item-center gap-6">
            <Image alt="icone de checado" src={iconCheckedImg}/>
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{guessCount}</span>
              <span>Palpites enviados</span>
            </div>
        </div>
      </div>
    </main>

    <Image src={appPreviewImage} alt="Dois celulares exibindo a aplicação" quality={100}/>
  </div>
)
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  

  const [ poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get("pools/count"),
    api.get("guesses/count"),
    api.get("users/count")
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  }
}
