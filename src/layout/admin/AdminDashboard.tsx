import React, { useEffect, useState } from "react";
import { getTotalOfMovies, getAllMovies, layToanBoPhim } from "../../api/movieApi";
import { getAllGenres } from "../../api/genreApi";
import { getComments } from "../../api/commentApi";
import RequireAdmin from "../../admin/RequireAdmin";
import { getAllUserCount } from "../../api/UserApi";
import { ParameterDigital } from "./component/ParameterDigital";
import { Chart } from "./component/chart/Chart";

const AdminDashboard: React.FC = () => {
  const [movieCount, setMovieCount] = useState(0);
  const [genreCount, setGenreCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [movieList, setMovieList] = useState<any[]>([]);

  useEffect(() => {
    getTotalOfMovies()
      .then((res: number) => setMovieCount(res))
      .catch(console.log);
  }, []);

  useEffect(() => {
    getAllGenres()
      .then((res: any[]) => setGenreCount(res?.length || 0))
      .catch(console.log);
  }, []);

  useEffect(() => {
    getComments()
      .then((res: any[]) => setCommentCount(res?.length || 0))
      .catch(console.log);
  }, []);

  useEffect(() => {
    getAllUserCount()
      .then((count) => setUserCount(count))
      .catch(console.log);
  }, []);

  useEffect(() => {
    getAllMovies(0,1000)
        .then((res) => {
          console.log("Movie list:", res.ketQua);
          setMovieList(res.ketQua);
        })
        .catch(console.log);
  }, []);


  return (
    <>
      <ParameterDigital
        numberOfAccount={userCount}
        numberOfMovie={movieCount}
        numberOfGenre={genreCount}
        numberOfComment={commentCount}
      />
      <Chart movies={movieList} />
    </>
  );
// ...existing code...
};

const DashboardPage = RequireAdmin(AdminDashboard);
export default DashboardPage;