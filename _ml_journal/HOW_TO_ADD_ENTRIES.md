# How to Add ML Journal Entries

This guide explains how to add new daily journal entries to your ML Journey page.

## Quick Steps

1. Create a new file in the `_ml_journal` directory
2. Name it with the format: `YYYY-MM-DD-day-N.md` (e.g., `2026-01-09-day-2.md`)
3. Copy the template below
4. Fill in your content
5. Commit and push to GitHub

## File Template

```markdown
---
layout: article
title: "Your Entry Title Here"
date: YYYY-MM-DD
day: N
topics:
  - Topic 1
  - Topic 2
  - Topic 3
---

Your content goes here! Write about what you learned today.

## What I Learned

Describe the main concepts or skills you learned.

## Challenges

What was difficult? What took time to understand?

## Tomorrow's Plan

What do you want to focus on next?

## Resources Used

- Resource 1
- Resource 2

---

**Reflection**: Add a brief reflection on the day's learning.
```

## Important Notes

- **Date format**: Use `YYYY-MM-DD` (e.g., `2026-01-09`)
- **Day number**: This is your learning day counter (Day 1, Day 2, etc.)
- **Topics**: These are optional tags that appear as colored badges
- **Title**: Make it descriptive and engaging
- **Layout**: Always use `layout: article` for individual entries

## Example File Name

If today is January 9, 2026, and it's your second day of learning:
- File name: `2026-01-09-day-2.md`
- In the frontmatter: `date: 2026-01-09` and `day: 2`

## Tips for Great Entries

1. **Be honest**: Document struggles as well as wins
2. **Be specific**: Instead of "learned about neural networks," write "learned how backpropagation updates weights in a neural network"
3. **Include code snippets**: Use markdown code blocks to show what you built
4. **Link resources**: Help your future self (and others) find the materials you used
5. **Keep it consistent**: Try to write each day, even if it's just a few paragraphs

## After Creating an Entry

The entry will automatically appear on your `/ml-journey/` page! The page shows entries in reverse chronological order (newest first), with the day number, date, topics, and an excerpt.

Happy learning!
