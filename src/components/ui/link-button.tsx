"use client";

import type { HTMLChakraProps, RecipeProps } from "@chakra-ui/react";
import { createRecipeContext } from "@chakra-ui/react";

// HTMLChakraProps와 RecipeProps가 빈 타입일 수 있으므로 명확히 정의
export interface LinkButtonProps
  extends HTMLChakraProps<"a">,
    RecipeProps<"button"> {}

const { withContext } = createRecipeContext({ key: "button" });

// Replace "a" with your framework's link component
export const LinkButton = withContext<HTMLAnchorElement, LinkButtonProps>("a");
