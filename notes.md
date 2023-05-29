# bioconceptvec-explorer-frontend

## Project setup

npx create-react-app ./ --template typescript
npm install -D tailwindcss
npx tailwindcss init

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

run

```sh
npm run start
```

I am using React and Tailwind css for background. I'm making an interface for creating equations. The most basic implementation is to have a text box on either side of an equal sign.

As you type into the text box, it will only allow you to type in valid tokens that can be used in an equation. There is an autocomplete feature that will suggest the next token. After you type in a valid token, it will turn into a block. You can backspace the block to turn it back into a text. After a token you only have the option to type in a `+` or a `-` operator which is another type of block. You cannot end on an operator. You can only end on a token.
You can type in the text box and it will turn into a block. You can backspace the block. You can check if the equation is valid. You can have a conversion between the proper name and the display name.

Please add tailwind classes to make it usable. The equations must be horizontal, not vertical like it is currently. There should be a visual distinction between operators and tokens. Make sure to have the validation for a specified token list. Make an example list such as ['apple', 'banana', etc]. There must also be two input boxes; one left of an equal sign and one to the right. I should be able to delete parts of the equation from any point. The current implementation only allows me to delete the end of an equation. If I select a token and if I press backspace, it should be deleted along with its corresponding operator in order to maintain a valid equation.

For the UI, you have two text boxes on either side of an equal sign.

As you type it turns into a block which you can backspace. You constantly check if it is valid.

You need to have the conversion between the proper name and the display name.

- break down the current dataset to have that mapping

Equation solver after taking in the UI.

Put it on Vercel.

Flask backend with fastapi.
Have backend doing the conversion and the equation solving.
