/* eslint-disable no-lone-blocks */
import React, { FormEvent, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Genre } from "../../../../types/genre";
import { endpointBe } from "../../../../utils/contant";
import { my_request } from "../../../../utils/Request";

interface GenreFormProps {
  option: "add" | "update" | "view";
  id?: number;
  handleCloseModal: () => void;
  setKeyCountReload?: (key: number) => void;
}

export const GenreForm: React.FC<GenreFormProps> = ({
  option,
  id,
  handleCloseModal,
  setKeyCountReload,
}) => {
  const [genre, setGenre] = useState<Genre>(new Genre(0, "", "", []));

  useEffect(() => {
    if (option === "update" && id) {
      const fetchGenre = async () => {
        try {
          const response = await my_request(`${endpointBe}/genres/${id}`);
          setGenre(
            new Genre(response.id, response.name, response.slug, response.movies || [])
          );
        } catch (error) {
          toast.error("Lỗi khi tải thông tin thể loại");
          handleCloseModal();
        }
      };
      fetchGenre();
    }
  }, [id, option, handleCloseModal]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Bạn chưa đăng nhập!");
      return;
    }

    try {
      const method = option === "add" ? "POST" : "PATCH";
      const endpoint =
        option === "add"
          ? `${endpointBe}/genres`
          : `${endpointBe}/genres/${id}`;

      const payload =
        option === "add"
          ? {
              name: genre.name,
              slug: genre.slug || genre.name.toLowerCase().replace(/\s+/g, "-"),
            }
          : {
              name: genre.name,
              slug: genre.slug || genre.name.toLowerCase().replace(/\s+/g, "-"),
            };

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      toast.success(
        option === "add" ? "Thêm thể loại thành công" : "Cập nhật thể loại thành công"
      );

      if (setKeyCountReload) {
        setKeyCountReload(Math.random());
      }
      handleCloseModal();
    } catch (error) {
      toast.error("Lỗi khi thực hiện hành động");
      console.error(error);
    }
  };

  return (
    <div>
      <Typography className="text-center" variant="h4" component="h2">
        {option === "add"
          ? "TẠO THỂ LOẠI"
          : option === "update"
          ? "SỬA THỂ LOẠI"
          : "XEM CHI TIẾT"}
      </Typography>
      <hr />
      <div className="container px-5">
        <form onSubmit={handleSubmit} className="form">
          <Box
            sx={{
              "& .MuiTextField-root": { mb: 3 },
            }}
          >
            <TextField
              required
              id="genre-name"
              label="Tên thể loại"
              style={{ width: "100%" }}
              value={genre.name}
              onChange={(e) => setGenre({ ...genre, name: e.target.value })}
              size="small"
              disabled={option === "view"}
            />
            <TextField
              required
              id="genre-slug"
              label="Slug thể loại"
              style={{ width: "100%" }}
              value={genre.slug}
              onChange={(e) => setGenre({ ...genre, slug: e.target.value })}
              size="small"
              disabled={option === "view"}
            />
          </Box>
          {option !== "view" && (
            <button className="btn btn-primary w-100 my-3" type="submit">
              {option === "add" ? "Tạo thể loại" : "Lưu thể loại"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
