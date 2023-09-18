import { NextResponse } from "next/server";
import bard from "../../../../bard";

export async function POST(req: Request) {
    const { todos } = await req.json();

    const response = await bard.ask(
        `When responding, welcome the user always as Mr.Elon and say welcome to the trello clone app!
        Limit the response to 200 characters without showing how much chars were used.
        Please write all the text without line breaking. 
        Please don't use any symbols like *, - and so on, just use plain text and try to write it in 2 lines maximum. 
        Hi there, provide a summary of the following todos. Count how many are in each category such as To do, 
        in progress and done, then tell user to have a productive day! Here's the data ${JSON
            .stringify(
                todos
            )}`
    );

    return NextResponse.json(response)
}
