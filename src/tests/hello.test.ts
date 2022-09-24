import { vi, test, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import docsModel from "../../models/docs"

// import { prettyDOM } from "@testing-library/dom"
// @ts-expect-error because who the hell knows
import App from "../App.svelte"


beforeEach(() => {
  docsModel.getDocs = vi.fn().mockResolvedValue([
    { _id: "1", title: "Dok1", body: "Dokument 1 Body" },
    { _id: "2", title: "Dok2", body: "Dokument 1 Body" },
    { _id: "3", title: "Dok3", body: "Dokument 1 Body" },
  ])

  render(App)
})

test("Dokument titles exists", () => {
  const title1 = screen.getByText("Dok1")
  const title2 = screen.getByText("Dok2")
  const title3 = screen.getByText("Dok3")

  expect(title1).not.toBeNull()
  expect(title2).not.toBeNull()
  expect(title3).not.toBeNull()
})

test("Selected dokument title replaces label in dropdown", async () => {
  const user = userEvent.setup()

  await user.click(screen.getByText("Dok1"))

  const title1 = screen.getAllByText("Dok1")

  expect(title1).toHaveLength(2)
})

test("Selected dokument title is written in title input", async () => {
  const user = userEvent.setup()

  await user.click(screen.getByText("Dok1"))

  const titleText = screen.getByDisplayValue("Dok1")

  expect(titleText).not.toBeNull()
})
