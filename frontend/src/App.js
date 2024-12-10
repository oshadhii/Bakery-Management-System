import ProductManagement from './pages/ProductManagement';
import ProductWastageManagement from './pages/ProductWastageManagement';
import ProductLogin from './ProductLogin.js';
import RequestStaff from './pages/RequestStaff';
import ProductionForm from './Components/ProductionForm.js'
import IngredientRequest from './pages/IngredientRequest';
import UpdateProduct from './pages/updateProduct';
import Inventory from './Inventory';
import Dashboard from './Dashboard.js';
import OrderRequest from './OrderRequest';
import Product_Report from './Product_Report';
import Order_Report from './Order_Report';
import Stock_Report from './Stock_Report';
import InventoryLogin from './InventoryLogin.js';
import EmployeeForm from './EmployeeForm.js';
import EmployeeLogin from './EmployeeLogin.js';
// import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CommercialOrder from './CommercialOrder';
import OrderLogin from './OrderLogin.js';
import Onlineorder from './OnlineOrder';
import Checkout from './Checkout';
import Home from './Home';
import OrderDashboard from './OrderDashboard';
import OnlineOrderDB from './OnlineOrderDB';
import AdminDashboard from './AdminDashboard';
import OrderDBUI from './OrderDBUI';
import NotificationDashboard from './NotificationDashboard';
import './index.css';
import Salesm from './Salesm';
import Nwplan from './Nwplan';
import Salesdash from './Salesdash';
import Prform from './Prform';
import Stables from './Stables';
import OrderDelivery from './OrderDelivery';
import SupplierLogin from './SupplierLogin.js';
import Form from './Form';
import DailyRoutes from './DailyRoutes';
import Dfirst from './Dfirst';
import ViewDailySales from './ViewDailySales'
import HeaderAdmin from './HeaderAdmin'
import Supplier from './Supplier';
import SupplierForm from './SupplierForm';
import View from './View';
import OrderView from './OrderView';
import OrderForm from './OrderForm';
import CustomerUI from './CustomerUI';  
import CustomerView from './CustomerView';
import Customer from './Customer';
import CustomerLogin from './CustomerLogin.js';
import CustomerEditForm from './CustomerEditForm';
import InquiryForm from './InquiryForm';
import AdminInquiryView from './AdminInquiryView';
import InquiryView from './InquiryView';
import Workers from './workers.js'
import Salary from './salary.js';
import Extra from './Extra.js';
import Display from './display.js';
import Admin from './Admin.js';
import Registration from './registration.js';
import DeliveryLogin from './DeliveryLogin.js';
import SalesLogin from './SalesLogin.js';



function App() {
    return (
        <BrowserRouter>
            <Routes>
               

                <Route path="/products" element={<ProductWastageManagement />} />
                <Route path='/ProductLogin' element={<ProductLogin/>}/>
                <Route path="/product-management" element={<ProductManagement />} />
                <Route path="/request-staff" element={<RequestStaff />} />
                <Route path='/request-ingredient' element={<IngredientRequest />} />
                <Route path='/daily-production' element={<ProductionForm />} />
                <Route path='/updateProduct/:id' element={<UpdateProduct />} /> 
                <Route path='/inventorylogin' element={<InventoryLogin/>}/>              
                <Route path = '/inventory' element={<Inventory/>} />
                <Route path = '/dashboard' element={<Dashboard/>} />
                <Route path = '/dashboard/request' element={<OrderRequest/>}/>
                <Route path = '/dashboard/productreport' element={<Product_Report/>}/>
                <Route path = '/dashboard/orderreport' element={<Order_Report/>}/>
                <Route path = '/dashboard/generatereport' element={<Stock_Report/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path= "/commercial" element={<CommercialOrder/>}/>
                <Route path="/Online" element={<Onlineorder/>}/>
                <Route path="/CheckoutOrder" element={<Checkout/>}/>
                <Route path="/OrderLogin" element={<OrderLogin/>}/>
                <Route path="/orderDashbrd" element={<OrderDashboard/>}/>
                <Route path="/onlineOrderDashbrd" element={<OnlineOrderDB/>}/>
                <Route path="/AdminDashbrd" element={<AdminDashboard/>}/>
                <Route path="/orderDBUI" element={<OrderDBUI/>}/>
                <Route path="/notification" element={<NotificationDashboard/>}/>
                <Route path='/sales' element={<Salesm/>}/>
                <Route path='/Prform' element={<Prform/>}/>
                <Route path='/plan' element={<Nwplan/>}/>
                <Route path='/Salesdash' element={<Salesdash/>}/>
                <Route path='/Stables' element={<Stables/>}/>
                <Route path='/Nwplan' element={<Nwplan/>}/>
                <Route path = '/Form' element={<Form/>}/>
                <Route path = '/orderdelivery'element={<OrderDelivery/>}/>
                <Route path = '/dailyroute'element={<DailyRoutes/>}/>
                <Route path = '/delivery'element={<Dfirst/>}/>
                <Route path = '/ViewDailySales'element={<ViewDailySales/>}/> 
                <Route path="/Supplier" element={<Supplier/>} />
                <Route path='/SupplierLogin' element={<SupplierLogin/>}/>
                <Route path="/SupplierForm" element={<SupplierForm />} />
                <Route path="/View" element={<View />} />
                <Route path='/OrderView' element={<OrderView />} />
                <Route path="/OrderForm" element={<OrderForm />} />
                <Route path="/CustomerUI" element={<CustomerUI/>} />
                <Route path="/CustomerView" element={<CustomerView/>} />
                <Route path='/Customer' element={<Customer/>} />
                <Route path='/CustomerLogin' element={<CustomerLogin/>}/>
                <Route path='/CustomerEditForm' element={<CustomerEditForm/>} />
                <Route path="/InquiryForm" element={<InquiryForm/>} />
                <Route path="/AdminInquiryView" element={<AdminInquiryView/>} />
                <Route path="/InquiryView" element={<InquiryView/>} />
                <Route path="/AdminDashbrd" element={<AdminDashboard/>} />
                <Route path = '/employees' element = {< Display/>} />
                <Route path = '/EmployeeForm' element = {<EmployeeForm/>}/>
                <Route path='/EmployeeLogin' element = {<EmployeeLogin/>}/>
                <Route path = '/workers' element = {<Workers/>}/>
                <Route path = '/salary' element = {<Salary/>}/>
                <Route path = '/Extra' element = {<Extra/>}/>
                <Route path = '/Admin' element = {<Admin/>}/>
                <Route path = '/registration' element = {<Registration/>}/>
                <Route path = '/DeliveryLogin' element = {<DeliveryLogin/>}/>
                <Route path = '/SalesLogin' element = {<SalesLogin/>}/>

            </Routes>
        </BrowserRouter>
    );
}



export default App;


