export function structureRole(role: any, roleQuestions: any) {
    return {
        id: role.id,
        focus: role.description,
        role: role.name,
        flashcards: structureQuestions(roleQuestions)
    }
}
const keys = ["A", "B", "C", "D"]
function structureQuestions(roleQuestions: any) {
    return roleQuestions.map((q: any) => {
        return {
            id: q.id,
            question: q.question,
            rationale: q.rationale,
            options: {
                "A": roleQuestions[0].question,
                "B": roleQuestions[1].question,
                "C": roleQuestions[2].question,
                "D": roleQuestions[3].question,
            },
            answer: keys[q.answers.filter((ans: any) => ans.is_correct)[0].display_order]
        }
    });
}