import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

interface CommentFormProps {
  open: boolean;
  comment: any | null;
  onClose: () => void;
  onSave: (updated: any) => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  open,
  comment,
  onClose,
  onSave,
}) => {
  const [content, setContent] = useState(comment?.content || "");

  React.useEffect(() => {
    if (comment) setContent(comment.content);
  }, [comment]);

  const handleSubmit = () => {
    if (comment) {
      onSave({ ...comment, content });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Chỉnh sửa bình luận</DialogTitle>
      <DialogContent>
        <TextField
          label="Nội dung"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};
