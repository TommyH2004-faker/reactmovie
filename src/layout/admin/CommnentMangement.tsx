
import { CommentTable } from "./component/comment/CommentTable";
import RequireAdmin from "../../admin/RequireAdmin";

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