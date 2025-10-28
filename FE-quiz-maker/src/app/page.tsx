// "use client";

// import { Button, Container, Typography, Box } from "@mui/material";
// import { useRouter } from "next/navigation";

// export default function LandingPage() {
//   const router = useRouter();

//   return (
//     <Container
//        maxWidth="sm"
//       className="flex flex-col items-center justify-center h-screen text-center"
//     >
//       <Typography variant="h3" fontWeight="bold" gutterBottom>
//         Welcome to Quiz Maker
//       </Typography>
//       <Typography variant="body1" color="text.secondary" gutterBottom>
//         Choose your mode to get started — create or play a quiz!
//       </Typography>

//       <Box className="flex gap-4 mt-8">
//         <Button
//           variant="contained"
//           size="large"
//           onClick={() => router.push("/builder")}
//         >
//           I'm a Builder
//         </Button>
//         <Button
//           variant="outlined"
//           size="large"
//           onClick={() => router.push("/player")}
//         >
//           I’m a Player
//         </Button>
//       </Box>
//     </Container>
//   );
// }


'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 space-y-6">
      <h1 className="text-4xl font-bold text-center">🚀 Quiz Maker</h1>
      <p className="text-gray-600 text-center">Create and play your coding quizzes.</p>

      <div className="flex space-x-4">
        <Link
          href="/builder"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Quiz Builder
        </Link>

        <Link
          href="/player"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Quiz Player
        </Link>
      </div>
    </main>
  )
}
