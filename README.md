![Imagem com o logotipo Memonotes e uma tela inicial da aplicação ao lado](readme/cover-memonotes.png)

# Memonotes

Memonotes é uma aplicação web para gerenciar notas de texto, incluindo a função de transcrição em tempo real (speech-to-text) através do uso da `Speech Recognition Web API`. Foi desenvolvida em Next para fins de estudos e exercícios práticos no desenvolvimento front-end, implementando recursos de acessibilidade, usabilidade e boas aplicações de UI e UX design.

🔗 [Acesse a aplicação](https://memonotes-js.vercel.app)
 
## Tecnologias utilizadas

![next](https://img.shields.io/badge/next.js-292b36?style=for-the-badge&logo=next.js)
![react](https://img.shields.io/badge/react-292b36?style=for-the-badge&logo=react)
![radix-ui](https://img.shields.io/badge/radix-292b36?style=for-the-badge&logo=radixui)
![tailwindcss](https://img.shields.io/badge/tailwindcss-292b36?style=for-the-badge&logo=tailwindcss)
![zustand](https://img.shields.io/badge/zustand-292b36?style=for-the-badge)

## Funcionalidades e características

- Gerenciamento de notas:
  - Adicionar, editar, remover;
  - Pesquisar por palavra no título ou conteúdo;
  - Filtar por tag;
- Captura de voz e transcrição em tempo real *(disponível apenas em alguns navegadores)*;
- Navegação funcional por teclado e mouse;
- Temas claro e escuro.

![Tela inicial da aplicação](readme/1-animation.gif)

## Instalação e execução local

Clone este repositório, em seguida, acesse a pasta do projeto e instale as dependendências necessárias seguindo os comandos abaixo:

```bash
git clone https://github.com/julianosill/memonotes.git
cd memonotes
pnpm install
```
Na sequência, inicie a aplicação localmente com o comando:

```bash
pnpm dev
```

A aplicação estará disponível através do endereço informado no seu terminal, por exemplo: [http://localhost:3000](http://localhost:3000).

## Screenshots do projeto

![Tela dividida ao meio exibindo a tela inicial da aplicação nos dois temas: claro e escuro](readme/screenshot-1.png)
![Tela inicial da aplicação](readme/screenshot-2.png)
![Tela com o formulário para adicionar nota](readme/screenshot-3.png)
![Tema com a função de captura de áudio e transcrição](readme/screenshot-4.png)

## Próximas etapas

- [x] Incluir animações para melhorar a experiência do usuário
- [ ] Realizar integração com banco de dados (Firebase)
- [ ] Adicionar autenticação através do Google

---

<sup>Desenvolvido por [Juliano Sill](https://github.com/julianosill)</sup>