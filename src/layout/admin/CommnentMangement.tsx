import RequireAdmin from "../../admin/RequireAdmin";
import { CommentTable } from "./component/comment/CommentTable";

const CommentManagement: React.FC = () => {
return (
		<div className='container p-5'>
			<div className='shadow-4-strong rounded p-5'>
				<CommentTable />
			</div>
		</div>
	);
};
const CommentPage = RequireAdmin(CommentManagement);
export default CommentPage;