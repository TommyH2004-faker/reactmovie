import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Genre } from "../types/genre";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface SelectMultipleProps {
    values: Genre[];           // Danh sách tất cả thể loại
    selectedList: number[];    // Danh sách ID thể loại đã chọn
    setSelectedList: (ids: number[]) => void;  // Hàm cập nhật ID thể loại đã chọn
    setValue: any;             // Hàm cập nhật giá trị cho form cha
    required: boolean;         // Có bắt buộc chọn không
    selectedListName: string[]; // Danh sách tên thể loại đã chọn (để hiển thị)
    setSelectedListName: (names: string[]) => void; // Hàm cập nhật tên thể loại đã chọn
}

export const SelectMultiple: React.FC<SelectMultipleProps> = (props) => {
    const handleChange = (event: SelectChangeEvent<typeof props.selectedListName>) => {
        const value = event.target.value;

        // Lọc từ danh sách thể loại, so sánh với các giá trị đã chọn
        const selectedGenres = props.values.filter((genre) => 
            typeof value === "string" 
                ? value.split(",").includes(genre.name)
                : value.includes(genre.name)
        );

        // Lấy ra danh sách ID của các thể loại đã chọn
        const selectedGenreIds = selectedGenres.map((genre) => genre.id);

        props.setSelectedList(selectedGenreIds);

        // Cập nhật danh sách tên thể loại đã chọn
        props.setSelectedListName(
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <div>
            <FormControl sx={{ mb: 3, width: "100%" }} size='small'>
                <InputLabel id='genre-multiple-checkbox-label'>Thể loại</InputLabel>
                <Select
                    labelId='genre-multiple-checkbox-label'
                    id='genre-multiple-checkbox'
                    multiple
                    value={Array.from(new Set(props.selectedListName))}
                    onChange={handleChange}
                    input={<OutlinedInput label='Thể loại' />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    required={props.required}
                >
                    {props.values.map((genre) => (
                        <MenuItem key={genre.id} value={genre.name}>
                            <Checkbox
                                checked={props.selectedListName.indexOf(genre.name) > -1}
                            />
                            <ListItemText primary={genre.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
