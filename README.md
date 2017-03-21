# react-simple-sticky
a simple sticky component 

## usage

```javascript
  ...import...
  
  class App extends Component{
    render(){
      return (
        <div>
          <MyHeader/>
          <MyLeftNav/>
          <div className="g-content">
            <Sticky zIndex={1}>
              <YourChildComponent/>
            </Sticky>
          </div>
        </div> 
      )
    }
  }  
```
