import { ReactNode } from "react";

export interface ComponentProps {
  children: ReactNode
}

export interface ButtonProps {
  title: string
  action?: () => void
}

export interface MovieProps {
  id?: string
  posterImage: string
  releaseYear: number  // Changed from string to number
  title: string
}

interface PrimaryImage {
  url: string
}

interface TitleText {
  text: string
}

interface ReleaseYear {
  year: number  // Changed from string to number
}

export interface MoviesProps {
  id: string
  primaryImage: PrimaryImage
  titleText: TitleText
  releaseYear: ReleaseYear
}