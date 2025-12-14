import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuiz, toggleActive } from "../features/quizzes/actions";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export default function MyQuizzesPage() {
  const quizzes = useSelector((state) => state.quizzes.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <h2>My Quizzes</h2>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Questions</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {quizzes.map((quiz) => (
            <TableRow key={quiz.id}>
              <TableCell>{quiz.title}</TableCell>

              <TableCell>
                {quiz.questions ? quiz.questions.length : 0}
              </TableCell>

              <TableCell>
                <Switch
                  checked={quiz.active !== false}
                  onChange={() => dispatch(toggleActive(quiz.id))}
                />
              </TableCell>

              <TableCell>
                {/* EDIT FULL QUIZ */}
                <IconButton onClick={() => navigate(`/edit/${quiz.id}`)}>
                  <EditIcon />
                </IconButton>

                {/* DELETE */}
                <IconButton
                  onClick={() => {
                    if (window.confirm("Delete this quiz?")) {
                      dispatch(deleteQuiz(quiz.id));
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
